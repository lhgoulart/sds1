package com.lhgoulart.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lhgoulart.dspesquisa.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long>{
	
}
