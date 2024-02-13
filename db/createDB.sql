drop table if exists User;
drop table if exists Solutions;
drop table if exists DemographicQuestion;
drop table if exists Votes;

create table User (
    id int [pk, increment],
    send_time timestamp,
    task text,
    dataset text
);

create table Solutions (
    user_id int,
    time timestamp,
    solution text
);

create table DemographicQuestion (
    user_id int,
    time timestamp,
    q1 int,
    q2 text,
    q3 text,
    q4 text,
    d5 text
);

create table Votes (
    user_id int,
    time timestamp,
    proposal_1 text,
    proposal_2 text,
    vote text
);

insert into User (send_time, task, dataset) values 
('2021-01-01 00:00:00', 'task1', 'dataset1'),
('2021-01-02 00:00:00', 'task2', 'dataset2');

insert into Solutions (user_id, time, solution) values 
(1, '2021-01-01 00:00:00', 'solution1'),
(1, '2021-01-01 00:00:00', 'solution2'),
(1, '2021-01-01 00:00:00', 'solution3'),
(2, '2021-01-02 00:00:00', 'solution1'),
(2, '2021-01-02 00:00:00', 'solution2'),
(2, '2021-01-02 00:00:00', 'solution3');

insert into DemographicQuestion (user_id, time, q1, q2, q3, q4, d5) values 
(1, '2021-01-01 00:00:00', 1, 'answer1', 'answer2', 'answer3', 'answer4'),
(2, '2021-01-02 00:00:00', 2, 'answer5', 'answer6', 'answer7', 'answer8');

insert into Votes (user_id, time, proposal_1, proposal_2, vote) values 
(1, '2021-01-01 00:00:00', 'proposal1', 'proposal2', 'vote1'),
(2, '2021-01-02 00:00:00', 'proposal3', 'proposal4', 'vote2');
