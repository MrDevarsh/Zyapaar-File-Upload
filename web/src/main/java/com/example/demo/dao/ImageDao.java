package com.example.demo.dao;

import com.example.demo.modal.ImageTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageDao extends JpaRepository<ImageTable, Long> {
}
