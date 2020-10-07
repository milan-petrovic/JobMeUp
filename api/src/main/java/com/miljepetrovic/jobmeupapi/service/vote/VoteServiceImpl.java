package com.miljepetrovic.jobmeupapi.service.vote;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.model.Vote;
import com.miljepetrovic.jobmeupapi.repository.VoteRepository;

@Service
public class VoteServiceImpl implements VoteService {
    private final static Logger logger = LoggerFactory.getLogger(VoteServiceImpl.class);

    private final VoteRepository voteRepository;

    public VoteServiceImpl(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    @Override
    public Vote saveVote(Vote vote) {
        logger.debug("Saving vote {}", vote);

        return voteRepository.save(vote);
    }

    @Override
    public Optional<Vote> findVoteByGivenEmployeeIdAndReceivedEmployeeId(int givenEmployeeId, int receivedEmployeeId) {
        logger.debug("Finding vote by given employee id {} and received employee id {}", givenEmployeeId, receivedEmployeeId);

        return voteRepository.findVoteByGivenEmployeeIdAndReceivedEmployeeId(givenEmployeeId, receivedEmployeeId);
    }
}
