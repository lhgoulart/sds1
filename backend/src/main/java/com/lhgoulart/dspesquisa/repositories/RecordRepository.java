package com.lhgoulart.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lhgoulart.dspesquisa.entities.Record;

public interface RecordRepository extends JpaRepository<Record, Long>{
	
}
