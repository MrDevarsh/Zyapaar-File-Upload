package com.example.demo.service.Impl;

import com.example.demo.dao.ImageDao;
import com.example.demo.modal.ImageTable;
import com.example.demo.service.ImageService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImageSereviceImpl implements ImageService {

    @Autowired
    ImageDao imageDao;

    @Override
    public ResponseEntity<String> saveImage(byte[] img) {
        try {
            ImageTable data = new ImageTable();
            data.setImage(img);

            ImageTable savedImage = imageDao.save(data);

            if (savedImage == null) {
                return ResponseEntity.internalServerError().body("Error saving image to database.");
            } else {
                return ResponseEntity.ok().body("Image saved successfully! Image Id: " + savedImage.getId());
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error saving image: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<byte[]> getImageById(Long id) {

        Optional<ImageTable> img = imageDao.findById(id);

        return img.map(imageTable -> ResponseEntity.ok().body(imageTable.getImage())).orElseGet(() -> ResponseEntity.internalServerError().body(null));

    }

    @Override
    public ResponseEntity<List<byte[]>> getAllImages() {
        List<ImageTable> images = imageDao.findAll();

        List<byte[]> data = new ArrayList<>();
        images.forEach(i -> data.add(i.getImage()));

        return ResponseEntity.ok().body(
                data
        );
    }
}
