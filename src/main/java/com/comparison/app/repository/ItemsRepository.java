package com.comparison.app.repository;

import com.comparison.app.domain.Items;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Items entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemsRepository extends JpaRepository<Items, Long> {

    @Query(value = "select distinct items from Items items left join fetch items.tags",
        countQuery = "select count(distinct items) from Items items")
    Page<Items> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct items from Items items left join fetch items.tags")
    List<Items> findAllWithEagerRelationships();

    @Query("select items from Items items left join fetch items.tags where items.id =:id")
    Optional<Items> findOneWithEagerRelationships(@Param("id") Long id);

}
