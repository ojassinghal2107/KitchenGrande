package KitchenGrande.KitchenGrande.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import KitchenGrande.KitchenGrande.model.wardrobes;

@Repository
public interface wardrobesRespository extends JpaRepository<wardrobes, Long> {

    List<wardrobes> findByIsActiveTrue();

}
