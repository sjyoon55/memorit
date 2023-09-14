package com.galaxy.memorit.friend.Infrastructure.persistence.entity;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import com.galaxy.memorit.common.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "friend")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(FriendKey.class)
public class FriendEntity extends BaseEntity {
	@Id
	@Column(name = "user_id", columnDefinition = "BINARY(16)")
	private UUID userId;
	@Id
	@Column(name = "friend_id", columnDefinition = "BINARY(16)")
	private UUID friendId;
	@Column(name = "name", length = 40, nullable = false)
	private String name;
	@Column(name = "category", length = 256)
	private String category;
	@Column(name = "received_count")
	@ColumnDefault("0")
	private int receivedCount;
	@Column(name = "sent_count")
	@ColumnDefault("0")
	private int sentCount;
	@Column(name = "received_money")
	@ColumnDefault("0")
	private int receivedMoney;
	@Column(name = "sent_money")
	@ColumnDefault("0")
	private int sentMoney;
	@Column(name = "recent_date")
	private LocalDate recentDate;

	public void updateInfo(String newName, String newCategory){
		this.name = newName;
		this.category = newCategory;
	}

	public void updateRecentDate(){
		this.recentDate = LocalDate.now();
	}
}
