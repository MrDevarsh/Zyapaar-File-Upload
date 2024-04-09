package com.example.demo.controller;

import com.example.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class FileUploadController {

    @Autowired
    ImageService imageService;

    @PostMapping(path = "/upload")
    public ResponseEntity<String> uploadImage(
            @RequestPart("file") MultipartFile file) throws IOException {
        byte[] img = file.getBytes();
        return imageService.saveImage(img);
    }

    @GetMapping(path = "/getImage")
    public ResponseEntity<byte[]> getImage(
            @RequestParam("id") Long id
    ) {

        return imageService.getImageById(id);

    }

    @GetMapping(path = "/getAll")
    public ResponseEntity<List<byte[]>> getAllImages() {
        return imageService.getAllImages();
    }

}
