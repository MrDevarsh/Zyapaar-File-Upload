package com.example.demo.service;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ImageService {

    public ResponseEntity<String> saveImage(byte[] img);

    public ResponseEntity<byte[]> getImageById(Long id);

    ResponseEntity<List<byte[]>> getAllImages();
}
