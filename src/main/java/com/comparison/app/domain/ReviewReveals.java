package com.comparison.app.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ReviewReveals.
 */
@Entity
@Table(name = "review_reveals")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReviewReveals implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tantei_ratio")
    private Integer tanteiRatio;

    @Column(name = "tantei_review")
    private Double tanteiReview;

    @Column(name = "checker_ratio")
    private Integer checkerRatio;

    @Column(name = "checker_review")
    private Double checkerReview;

    @Column(name = "filterd_ratio")
    private Integer filterdRatio;

    @Column(name = "filterd_review")
    private Double filterdReview;

    @Column(name = "cleated")
    private Instant cleated;

    @Column(name = "updated")
    private Instant updated;

    @OneToOne
    @JoinColumn(unique = true)
    private Items items;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTanteiRatio() {
        return tanteiRatio;
    }

    public ReviewReveals tanteiRatio(Integer tanteiRatio) {
        this.tanteiRatio = tanteiRatio;
        return this;
    }

    public void setTanteiRatio(Integer tanteiRatio) {
        this.tanteiRatio = tanteiRatio;
    }

    public Double getTanteiReview() {
        return tanteiReview;
    }

    public ReviewReveals tanteiReview(Double tanteiReview) {
        this.tanteiReview = tanteiReview;
        return this;
    }

    public void setTanteiReview(Double tanteiReview) {
        this.tanteiReview = tanteiReview;
    }

    public Integer getCheckerRatio() {
        return checkerRatio;
    }

    public ReviewReveals checkerRatio(Integer checkerRatio) {
        this.checkerRatio = checkerRatio;
        return this;
    }

    public void setCheckerRatio(Integer checkerRatio) {
        this.checkerRatio = checkerRatio;
    }

    public Double getCheckerReview() {
        return checkerReview;
    }

    public ReviewReveals checkerReview(Double checkerReview) {
        this.checkerReview = checkerReview;
        return this;
    }

    public void setCheckerReview(Double checkerReview) {
        this.checkerReview = checkerReview;
    }

    public Integer getFilterdRatio() {
        return filterdRatio;
    }

    public ReviewReveals filterdRatio(Integer filterdRatio) {
        this.filterdRatio = filterdRatio;
        return this;
    }

    public void setFilterdRatio(Integer filterdRatio) {
        this.filterdRatio = filterdRatio;
    }

    public Double getFilterdReview() {
        return filterdReview;
    }

    public ReviewReveals filterdReview(Double filterdReview) {
        this.filterdReview = filterdReview;
        return this;
    }

    public void setFilterdReview(Double filterdReview) {
        this.filterdReview = filterdReview;
    }

    public Instant getCleated() {
        return cleated;
    }

    public ReviewReveals cleated(Instant cleated) {
        this.cleated = cleated;
        return this;
    }

    public void setCleated(Instant cleated) {
        this.cleated = cleated;
    }

    public Instant getUpdated() {
        return updated;
    }

    public ReviewReveals updated(Instant updated) {
        this.updated = updated;
        return this;
    }

    public void setUpdated(Instant updated) {
        this.updated = updated;
    }

    public Items getItems() {
        return items;
    }

    public ReviewReveals items(Items items) {
        this.items = items;
        return this;
    }

    public void setItems(Items items) {
        this.items = items;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ReviewReveals reviewReveals = (ReviewReveals) o;
        if (reviewReveals.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reviewReveals.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReviewReveals{" +
            "id=" + getId() +
            ", tanteiRatio=" + getTanteiRatio() +
            ", tanteiReview=" + getTanteiReview() +
            ", checkerRatio=" + getCheckerRatio() +
            ", checkerReview=" + getCheckerReview() +
            ", filterdRatio=" + getFilterdRatio() +
            ", filterdReview=" + getFilterdReview() +
            ", cleated='" + getCleated() + "'" +
            ", updated='" + getUpdated() + "'" +
            "}";
    }
}
