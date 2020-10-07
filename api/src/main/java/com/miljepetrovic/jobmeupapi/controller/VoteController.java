package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.model.Vote;
import com.miljepetrovic.jobmeupapi.service.vote.VoteService;

@RestController
@RequestMapping("votes")
public class VoteController {
    private final static Logger logger = LoggerFactory.getLogger(VoteController.class);

    private final VoteService voteService;

    @Autowired
    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postNewVote(@RequestBody Vote vote) {
        logger.info("POST /votes {}", vote);
        Vote persistedVote = voteService.saveVote(vote);

        return ResponseEntity.created(URI.create(String.valueOf(persistedVote.getId()))).build();
    }
}
