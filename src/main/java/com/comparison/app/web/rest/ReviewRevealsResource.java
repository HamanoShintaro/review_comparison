package com.comparison.app.web.rest;
import com.comparison.app.domain.ReviewReveals;
import com.comparison.app.repository.ReviewRevealsRepository;
import com.comparison.app.web.rest.errors.BadRequestAlertException;
import com.comparison.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing ReviewReveals.
 */
@RestController
@RequestMapping("/api")
public class ReviewRevealsResource {

    private final Logger log = LoggerFactory.getLogger(ReviewRevealsResource.class);

    private static final String ENTITY_NAME = "reviewReveals";

    private final ReviewRevealsRepository reviewRevealsRepository;

    public ReviewRevealsResource(ReviewRevealsRepository reviewRevealsRepository) {
        this.reviewRevealsRepository = reviewRevealsRepository;
    }

    /**
     * POST  /review-reveals : Create a new reviewReveals.
     *
     * @param reviewReveals the reviewReveals to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reviewReveals, or with status 400 (Bad Request) if the reviewReveals has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/review-reveals")
    public ResponseEntity<ReviewReveals> createReviewReveals(@RequestBody ReviewReveals reviewReveals) throws URISyntaxException {
        log.debug("REST request to save ReviewReveals : {}", reviewReveals);
        if (reviewReveals.getId() != null) {
            throw new BadRequestAlertException("A new reviewReveals cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReviewReveals result = reviewRevealsRepository.save(reviewReveals);
        return ResponseEntity.created(new URI("/api/review-reveals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /review-reveals : Updates an existing reviewReveals.
     *
     * @param reviewReveals the reviewReveals to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reviewReveals,
     * or with status 400 (Bad Request) if the reviewReveals is not valid,
     * or with status 500 (Internal Server Error) if the reviewReveals couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/review-reveals")
    public ResponseEntity<ReviewReveals> updateReviewReveals(@RequestBody ReviewReveals reviewReveals) throws URISyntaxException {
        log.debug("REST request to update ReviewReveals : {}", reviewReveals);
        if (reviewReveals.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReviewReveals result = reviewRevealsRepository.save(reviewReveals);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reviewReveals.getId().toString()))
            .body(result);
    }

    /**
     * GET  /review-reveals : get all the reviewReveals.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of reviewReveals in body
     */
    @GetMapping("/review-reveals")
    public List<ReviewReveals> getAllReviewReveals(@RequestParam(required = false) String filter) {
        if ("items-is-null".equals(filter)) {
            log.debug("REST request to get all ReviewRevealss where items is null");
            return StreamSupport
                .stream(reviewRevealsRepository.findAll().spliterator(), false)
                .filter(reviewReveals -> reviewReveals.getItems() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ReviewReveals");
        return reviewRevealsRepository.findAll();
    }

    /**
     * GET  /review-reveals/:id : get the "id" reviewReveals.
     *
     * @param id the id of the reviewReveals to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reviewReveals, or with status 404 (Not Found)
     */
    @GetMapping("/review-reveals/{id}")
    public ResponseEntity<ReviewReveals> getReviewReveals(@PathVariable Long id) {
        log.debug("REST request to get ReviewReveals : {}", id);
        Optional<ReviewReveals> reviewReveals = reviewRevealsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reviewReveals);
    }

    /**
     * DELETE  /review-reveals/:id : delete the "id" reviewReveals.
     *
     * @param id the id of the reviewReveals to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/review-reveals/{id}")
    public ResponseEntity<Void> deleteReviewReveals(@PathVariable Long id) {
        log.debug("REST request to delete ReviewReveals : {}", id);
        reviewRevealsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
