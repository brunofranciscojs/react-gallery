# Galeria em ReactJS

Este projeto é uma galeria desenvolvida em ReactJS que utiliza firebase para armazenar as imagens e suas respectivas pastas/categorias. 
O visual foi inspirado no https://folio.procreate.com e a aparência da galeria é em estilo masonry, deixando um visual elegante.

Ele lê as imagens diretamente do firestore, as categorias são criadas a partir do nome das pastas de cada imagem.

O projeto pode ser acessado em https://ilustras.brunofrancisco.com.br

## Tecnologias Utilizadas
- ReactJS
- SASS
- FireBase/FireStore
- Javascript

## Funcionalidades
  - Exibe as imagens em uma galeria estilo masonry.
  - Permite filtrar as imagens por categoria.
  - Exibe as imagens em uma modal ao clicar em uma delas.
  
### Como Utilizar
Para utilizar a galeria em seu próprio projeto, siga os passos abaixo:

### Clone o repositório em sua máquina:
```bash
  - git clone https://github.com/brunofranciscu/galeria.git
``` 
### Instale as dependências:

```bash
  - cd galeria
  - npm install
```
Configure o arquivo .env com as credenciais de sua planilha no Google Apps Script.

### Execute o projeto:
```bash
  - npm start
```
 
### Contribuindo
Contribuições são sempre bem-vindas. Para contribuir, siga os passos abaixo:

### Crie um fork do repositório.
Crie uma nova branch:

```bash
  - git checkout -b minha-branch
```
Faça suas alterações e faça o commit:

```bash
  - git commit -m "Minhas alterações"
```
Faça o push para o seu fork:

```bash
  - git push origin minha-branch
```
Crie um pull request para o repositório original.
