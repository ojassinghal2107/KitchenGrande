package KitchenGrande.KitchenGrande.model;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data 
@NoArgsConstructor 
public class KitchenDesign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 50)
    private String category; // e.g., 'L-Shape', 'Modern', 'Classic'

    @Column(name = "image_url", nullable = false)
    private String imageUrl; // Maps to image_url in the database

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at", updatable = false) // updatable=false means set once on creation
    private LocalDateTime createdAt = LocalDateTime.now();
}