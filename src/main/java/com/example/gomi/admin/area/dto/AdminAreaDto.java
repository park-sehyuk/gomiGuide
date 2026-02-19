package com.example.gomi.admin.area.dto;

import java.util.List;

public class AdminAreaDto {
    private String id;
    private String type;
    private String nameKo;
    private String nameJp;
    private String note;
    private boolean active;
    private Schedule schedule;

    public AdminAreaDto() {}

    public AdminAreaDto(String id, String type, String nameKo, String nameJp,
                        String note, boolean active, Schedule schedule) {
        this.id = id;
        this.type = type;
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.note = note;
        this.active = active;
        this.schedule = schedule;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNameKo() {
        return nameKo;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public String getNameJp() {
        return nameJp;
    }

    public void setNameJp(String nameJp) {
        this.nameJp = nameJp;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public static class Schedule {
        private List<Integer> burnable;
        private List<Integer> nonburnable;
        private List<Integer> recyclable;
        private List<Integer> sodai;
        private String timeStart;
        private String timeEnd;
        private String effectiveFrom;
        private String effectiveTo;

        public Schedule() {}

        public Schedule(List<Integer> burnable, List<Integer> nonburnable,
                        List<Integer> recyclable, List<Integer> sodai,
                        String timeStart, String timeEnd,
                        String effectiveFrom, String effectiveTo) {
            this.burnable = burnable;
            this.nonburnable = nonburnable;
            this.recyclable = recyclable;
            this.sodai = sodai;
            this.timeStart = timeStart;
            this.timeEnd = timeEnd;
            this.effectiveFrom = effectiveFrom;
            this.effectiveTo = effectiveTo;
        }

        public List<Integer> getBurnable() {
            return burnable;
        }

        public void setBurnable(List<Integer> burnable) {
            this.burnable = burnable;
        }

        public List<Integer> getNonburnable() {
            return nonburnable;
        }

        public void setNonburnable(List<Integer> nonburnable) {
            this.nonburnable = nonburnable;
        }

        public List<Integer> getRecyclable() {
            return recyclable;
        }

        public void setRecyclable(List<Integer> recyclable) {
            this.recyclable = recyclable;
        }

        public List<Integer> getSodai() {
            return sodai;
        }

        public void setSodai(List<Integer> sodai) {
            this.sodai = sodai;
        }

        public String getTimeStart() {
            return timeStart;
        }

        public void setTimeStart(String timeStart) {
            this.timeStart = timeStart;
        }

        public String getTimeEnd() {
            return timeEnd;
        }

        public void setTimeEnd(String timeEnd) {
            this.timeEnd = timeEnd;
        }

        public String getEffectiveFrom() {
            return effectiveFrom;
        }

        public void setEffectiveFrom(String effectiveFrom) {
            this.effectiveFrom = effectiveFrom;
        }

        public String getEffectiveTo() {
            return effectiveTo;
        }

        public void setEffectiveTo(String effectiveTo) {
            this.effectiveTo = effectiveTo;
        }
    }
}
