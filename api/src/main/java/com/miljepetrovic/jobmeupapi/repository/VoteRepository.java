package com.miljepetrovic.jobmeupapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.miljepetrovic.jobmeupapi.model.Vote;

public interface VoteRepository extends JpaRepository<Vote, Integer> {
    @Query("select v from Vote v where v.givenEmployee.id=:givenEmployeeId and v.receivedEmployee.id=:receivedEmployeeId")
    Optional<Vote> findVoteByGivenEmployeeIdAndReceivedEmployeeId(int givenEmployeeId, int receivedEmployeeId);
}
