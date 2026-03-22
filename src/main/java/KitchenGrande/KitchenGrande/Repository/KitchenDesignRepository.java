package KitchenGrande.KitchenGrande.Repository;
import KitchenGrande.KitchenGrande.model.KitchenDesign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface KitchenDesignRepository extends JpaRepository<KitchenDesign, Long> {

    /**
     * Custom finder method: Finds all designs where the category matches the provided value.
     * Spring Data JPA automatically generates the SQL for this method name.
     */
    List<KitchenDesign> findByCategory(String category);

    /**
     * Custom finder method: Finds all designs that are currently active.
     */
    List<KitchenDesign> findByIsActiveTrue();
}