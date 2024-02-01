import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import CardMovies from './CardMovies';
import Container from 'react-bootstrap/Container';




function Movies() {

  const initialValue = JSON.parse(localStorage.getItem("Movies")) || [];

    const [Movies, setMovies] = useState(initialValue)
    const [editIndex, setEditIndex] = useState(null);

    
    useEffect(() => {
        localStorage.setItem("Movies",  JSON.stringify(Movies))
    }, [Movies])
    




    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();

      const onSubmit = (data) => {
        if (editIndex === null) {

          setMovies([...Movies, data]);
        } else {

          const updatedMovies = [...Movies];
          updatedMovies[editIndex] = data;
          setMovies(updatedMovies);
          setEditIndex(null); 
        }
        reset(); 
      };

      const handleDelete = (index) => {
  const updatedMovies = Movies.filter((_, i) => i !== index);
  setMovies(updatedMovies);
  

  if (editIndex === index) {
    setEditIndex(null);
  }
};

const handleEdit = (index) => {
  setEditIndex(index);
};
  return (
    <>
    <Container fluid className='containerForm'>
        <Form className='formData' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3 name" controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mortal Kombat"
              {...register('nombre', { required: 'Este campo es obligatorio' })}
            />
            {errors.nombre && <p>{errors.nombre.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3 name" controlId="formName">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese url de Imagen"
              {...register('image', { required: 'Este campo es obligatorio' })}
            />
            {errors.image && <p>{errors.image.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3 textArea" controlId="formTextArea">
            <Form.Label>Ingrese descripción de la película</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Mortal kombat es una película de peleas..."
              {...register('descripcion', { required: 'Este campo es obligatorio' })}
            />
            {errors.descripcion && <p>{errors.descripcion.message}</p>}
          </Form.Group>
          <Form.Select controlId="formSelect" {...register('category', { required: 'Debe seleccionar una categoría' })}>
            <option >Elegir Categoría</option>
            <option value="Comedia">Comedia</option>
            <option value="Drama">Drama</option>
            <option value="Infantil">Infantil</option>
            <option value="Terror">Terror</option>
            <option value="Accion">Acción</option>
          </Form.Select>
          {errors.category && <p>{errors.category.message}</p>}
          <Button type='submit' variant="primary">Enviar</Button>
        </Form>
      </Container>

<Container fluid className='containerMap'>
{Movies.map((movie, index) => (
  <CardMovies
    key={index}
    movie={movie}
    onDelete={handleDelete}
    onEdit={handleEdit}
    index={index}
    editIndex={editIndex}
  />
))}
</Container>
    </>
  );
}

export default Movies;