package KitchenGrande.KitchenGrande.Repository;
import KitchenGrande.KitchenGrande.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;   
import org.springframework.stereotype.Repository;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {


    
}
