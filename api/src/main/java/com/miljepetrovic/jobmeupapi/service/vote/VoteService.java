package com.miljepetrovic.jobmeupapi.service.vote;

import java.util.Optional;

import com.miljepetrovic.jobmeupapi.model.Vote;

public interface VoteService {
    Vote saveVote(Vote voteDto);
    Optional<Vote> findVoteByGivenEmployeeIdAndReceivedEmployeeId(int givenEmployeeId, int receivedEmployeeId);
}
