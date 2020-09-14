package com.lhgoulart.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lhgoulart.dspesquisa.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long>{
	
}
