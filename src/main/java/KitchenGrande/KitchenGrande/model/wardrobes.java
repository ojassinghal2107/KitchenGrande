package KitchenGrande.KitchenGrande.model;  

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class wardrobes{

    @jakarta.persistence.Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private String description;
    private String category;
    private String imageUrl;
    private Boolean isActive = true;
    
}
