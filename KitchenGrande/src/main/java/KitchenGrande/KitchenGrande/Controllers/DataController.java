package KitchenGrande.KitchenGrande.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import KitchenGrande.KitchenGrande.Repository.EnquiryRepository;
import KitchenGrande.KitchenGrande.Repository.KitchenDesignRepository;
import KitchenGrande.KitchenGrande.Repository.wardrobesRespository;
import KitchenGrande.KitchenGrande.model.Enquiry;
import KitchenGrande.KitchenGrande.model.KitchenDesign;
import KitchenGrande.KitchenGrande.model.wardrobes;


@RestController
@RequestMapping("/")
public class DataController {

    @Autowired
    KitchenDesignRepository kitchenDesignRepository;

    @Autowired
    EnquiryRepository EnquiryRepository;
    
    @Autowired
    wardrobesRespository wardrobesrespository;  
    
    
    @GetMapping("/designs")
    public List<KitchenDesign> getAllActiveDesigns() {
        
        return kitchenDesignRepository.findByIsActiveTrue();
    }
   @PostMapping("/sendEnquiry")
    public ResponseEntity<Void> sendEnquiry(@RequestBody Enquiry enquiry) {
        
        EnquiryRepository.save(enquiry);
        return ResponseEntity.ok().build(); 
    }
    @GetMapping("/wardrobes")
    public List<wardrobes> getAllActivewWardrobes() {
        
        return wardrobesrespository.findByIsActiveTrue();
    }
   
}