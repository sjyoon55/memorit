package com.galaxy.memorit.historytype.infrastructure.persistence.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "baseHistoryType")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaseHistoryTypeEntity {
	@Id
	@Column(name = "type_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "type_name", length = 128, nullable = false)
	private String typeName;
}
