package com.comparison.app.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Items.
 */
@Entity
@Table(name = "items")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Items implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amazon_id")
    private String amazonId;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Integer price;

    @Column(name = "review_number")
    private Integer reviewNumber;

    @Column(name = "review_evaluation")
    private Double reviewEvaluation;

    @Column(name = "link_url")
    private String linkUrl;

    @Column(name = "cleated")
    private Instant cleated;

    @Column(name = "updated")
    private Instant updated;

    @OneToOne
    @JoinColumn(unique = true)
    private ReviewReveals reviewReveals;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "items_tags",
               joinColumns = @JoinColumn(name = "items_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tags_id", referencedColumnName = "id"))
    private Set<Tags> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAmazonId() {
        return amazonId;
    }

    public Items amazonId(String amazonId) {
        this.amazonId = amazonId;
        return this;
    }

    public void setAmazonId(String amazonId) {
        this.amazonId = amazonId;
    }

    public String getName() {
        return name;
    }

    public Items name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public Items price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getReviewNumber() {
        return reviewNumber;
    }

    public Items reviewNumber(Integer reviewNumber) {
        this.reviewNumber = reviewNumber;
        return this;
    }

    public void setReviewNumber(Integer reviewNumber) {
        this.reviewNumber = reviewNumber;
    }

    public Double getReviewEvaluation() {
        return reviewEvaluation;
    }

    public Items reviewEvaluation(Double reviewEvaluation) {
        this.reviewEvaluation = reviewEvaluation;
        return this;
    }

    public void setReviewEvaluation(Double reviewEvaluation) {
        this.reviewEvaluation = reviewEvaluation;
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public Items linkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
        return this;
    }

    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
    }

    public Instant getCleated() {
        return cleated;
    }

    public Items cleated(Instant cleated) {
        this.cleated = cleated;
        return this;
    }

    public void setCleated(Instant cleated) {
        this.cleated = cleated;
    }

    public Instant getUpdated() {
        return updated;
    }

    public Items updated(Instant updated) {
        this.updated = updated;
        return this;
    }

    public void setUpdated(Instant updated) {
        this.updated = updated;
    }

    public ReviewReveals getReviewReveals() {
        return reviewReveals;
    }

    public Items reviewReveals(ReviewReveals reviewReveals) {
        this.reviewReveals = reviewReveals;
        return this;
    }

    public void setReviewReveals(ReviewReveals reviewReveals) {
        this.reviewReveals = reviewReveals;
    }

    public Set<Tags> getTags() {
        return tags;
    }

    public Items tags(Set<Tags> tags) {
        this.tags = tags;
        return this;
    }

    public Items addTags(Tags tags) {
        this.tags.add(tags);
        tags.getItems().add(this);
        return this;
    }

    public Items removeTags(Tags tags) {
        this.tags.remove(tags);
        tags.getItems().remove(this);
        return this;
    }

    public void setTags(Set<Tags> tags) {
        this.tags = tags;
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
        Items items = (Items) o;
        if (items.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), items.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Items{" +
            "id=" + getId() +
            ", amazonId='" + getAmazonId() + "'" +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", reviewNumber=" + getReviewNumber() +
            ", reviewEvaluation=" + getReviewEvaluation() +
            ", linkUrl='" + getLinkUrl() + "'" +
            ", cleated='" + getCleated() + "'" +
            ", updated='" + getUpdated() + "'" +
            "}";
    }
}
