import Card from 'react-bootstrap/Card';

function CardMovies({ movie, onDelete, index, editIndex, onEdit }) {


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.nombre}</Card.Title>
        <Card.Text>
          {movie.descripcion}
        </Card.Text>
        <Card.Footer className="text-muted">
        {movie.Category}
        <button className='btnDelete' onClick={() => onDelete(index)}>
          Eliminar Película
        </button>
        <button
          className='btnEdit'
          onClick={() => onEdit(index)}
          disabled={editIndex !== null}  
        >
          Editar Película
        </button>
      </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default CardMovies;