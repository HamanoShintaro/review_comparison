package com.comparison.app.repository;

import com.comparison.app.domain.ReviewReveals;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReviewReveals entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRevealsRepository extends JpaRepository<ReviewReveals, Long> {

}
