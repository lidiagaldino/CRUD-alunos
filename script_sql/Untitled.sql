show databases;

drop database dbcontatos2022_2;

create database db_lion_school;

use db_lion_school;

show tables;

create table tbl_aluno (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(80) not null,
    foto varchar(100) not null,
    sexo varchar(1),
	rg varchar(15) not null,
    cpf varchar(18) not null,
    email varchar(256) not null,
    telefone varchar(18),
    celular varchar(18),
    data_nascimento date not null,
    unique index(id)
);

create table tbl_curso (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(50) not null,
    carga_horaria int not null,
    icone varchar(100),
    sigla varchar(5),
    unique index(id)
);

create table tbl_aluno_curso (
	id int unsigned not null auto_increment primary key,
    id_aluno int unsigned not null,
    id_curso int unsigned not null,
	matricula varchar(15) not null,
    status_aluno varchar(10) not null,
    
    foreign key (id_aluno)
		references tbl_aluno (id),
	foreign key (id_curso)
		references tbl_curso (id),
	unique index(id)
);

select * from tbl_aluno;

insert into tbl_aluno (nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento)
	values ('José da Silva', 'https://i.pinimg.com/originals/63/76/87/637687681abda298cf4371136aa33765.jpg', 'M', '34.456.666-1', '300.567.456-13', 'jose@gmail.com', '011 4556-7777', '011 99765-6660', '2000-04-10');
    
insert into tbl_aluno (nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento)
	values ('Maria da Silva', 'https://cdn-icons-png.flaticon.com/512/5526/5526465.png', 'F', '23.345.555-1', '200.456.345-02', 'maria@gmail.com', '011 4556-6666', '011 99654-5550', '2000-03-09');
    
update tbl_aluno set rg = '35.567.23-4' where id = 1;

delete from tbl_aluno where id = 1;