import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminItemFormPage.css";

const LANG_OPTIONS = ["KO", "JP", "ETC"];

const emptySynonym = { keyword: "", lang: "KO" };

const AdminItemFormPage = () => {
  const { itemId } = useParams();
  const isEdit = Boolean(itemId);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nameKo: "",
    nameJp: "",
    categoryId: "",
    description: "",
    officialUrl: "",
    active: true,
    synonyms: [{ ...emptySynonym }],
  });

  useEffect(() => {
    (async () => {
      try {
        const [categoryRes, itemRes] = await Promise.all([
          fetch("/api/category", { credentials: "include" }),
          isEdit
            ? fetch(`/api/admin/items/${itemId}`, { credentials: "include" })
            : Promise.resolve(null),
        ]);

        if (!categoryRes.ok)
          throw new Error(`category fetch failed: ${categoryRes.status}`);
        const categoryData = await categoryRes.json();
        setCategories(Array.isArray(categoryData) ? categoryData : []);

        if (isEdit && itemRes) {
          if (!itemRes.ok)
            throw new Error(`item fetch failed: ${itemRes.status}`);
          const item = await itemRes.json();
          setForm({
            nameKo: item?.nameKo ?? "",
            nameJp: item?.nameJp ?? "",
            categoryId: item?.categoryId ?? "",
            description: item?.description ?? "",
            officialUrl: item?.officialUrl ?? "",
            active: item?.active ?? true,
            synonyms:
              Array.isArray(item?.synonyms) && item.synonyms.length > 0
                ? item.synonyms.map((s) => ({
                    keyword: s.keyword ?? "",
                    lang: (s.lang ?? "KO").toString().toUpperCase(),
                  }))
                : [{ ...emptySynonym }],
          });
        }
      } catch (e) {
        console.error("form load failed:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, itemId]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSynonymChange = (index, key, value) => {
    setForm((prev) => {
      const next = prev.synonyms.slice();
      next[index] = { ...next[index], [key]: value };
      return { ...prev, synonyms: next };
    });
  };

  const addSynonym = () => {
    setForm((prev) => ({
      ...prev,
      synonyms: [...prev.synonyms, { ...emptySynonym }],
    }));
  };

  const removeSynonym = (index) => {
    setForm((prev) => {
      const next = prev.synonyms.slice();
      next.splice(index, 1);
      return { ...prev, synonyms: next.length ? next : [{ ...emptySynonym }] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nameKo: form.nameKo,
        nameJp: form.nameJp,
        categoryId: Number(form.categoryId),
        description: form.description || null,
        officialUrl: form.officialUrl || null,
        active: Boolean(form.active),
        synonyms: form.synonyms
          .map((s) => ({
            keyword: s.keyword?.trim(),
            lang: s.lang,
          }))
          .filter((s) => s.keyword),
      };

      const res = await fetch(
        isEdit ? `/api/admin/items/${itemId}` : "/api/admin/items",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error(`save failed: ${res.status}`);
      navigate("/admin/items");
    } catch (e) {
      console.error("save failed:", e);
      alert("저장에 실패했습니다. 입력값을 확인해주세요.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="AdminItemForm">
      <h1>{isEdit ? "품목 수정" : "품목 등록"}</h1>
      <form onSubmit={handleSubmit} className="Form">
        <div className="Field">
          <label>이름(ko)</label>
          <input
            type="text"
            value={form.nameKo}
            onChange={(e) => handleChange("nameKo", e.target.value)}
            required
          />
        </div>
        <div className="Field">
          <label>이름(jp)</label>
          <input
            type="text"
            value={form.nameJp}
            onChange={(e) => handleChange("nameJp", e.target.value)}
            required
          />
        </div>
        <div className="Field">
          <label>카테고리</label>
          <select
            value={form.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            required
          >
            <option value="">선택</option>
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryId}>
                {c.nameKo}
              </option>
            ))}
          </select>
        </div>
        <div className="Field">
          <label>공식 URL</label>
          <input
            type="text"
            value={form.officialUrl}
            onChange={(e) => handleChange("officialUrl", e.target.value)}
            placeholder="https://"
          />
        </div>
        <div className="Field">
          <label>설명</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div className="Field Inline">
          <label>활성</label>
          <input
            type="checkbox"
            checked={Boolean(form.active)}
            onChange={(e) => handleChange("active", e.target.checked)}
          />
        </div>

        <div className="Synonyms">
          <div className="SynonymsHeader">
            <h3>동의어</h3>
            <button type="button" onClick={addSynonym}>
              추가
            </button>
          </div>
          {form.synonyms.map((s, idx) => (
            <div className="SynonymRow" key={`syn-${idx}`}>
              <input
                type="text"
                placeholder="키워드"
                value={s.keyword}
                onChange={(e) =>
                  handleSynonymChange(idx, "keyword", e.target.value)
                }
              />
              <select
                value={s.lang}
                onChange={(e) =>
                  handleSynonymChange(idx, "lang", e.target.value)
                }
              >
                {LANG_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="RemoveBtn"
                onClick={() => removeSynonym(idx)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        <div className="Actions">
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
          <button type="submit" className="Primary">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminItemFormPage;
