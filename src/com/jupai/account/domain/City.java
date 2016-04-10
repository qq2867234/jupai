package com.jupai.account.domain;

public class City {
    private Integer cityCode;

    private Integer provinceCode;

    private String location;

    private Double longitude;

    private Double latitude;

    private Byte open = 0;

    public Integer getCityCode() {
        return cityCode;
    }

    public void setCityCode(Integer cityCode) {
        this.cityCode = cityCode;
    }

    public Integer getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(Integer provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getlocation() {
        return location;
    }

    public void setlocation(String location) {
        this.location = location == null ? null : location.trim();
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Byte getOpen() {
        return open;
    }

    public void setOpen(Byte open) {
        this.open = open;
    }
}