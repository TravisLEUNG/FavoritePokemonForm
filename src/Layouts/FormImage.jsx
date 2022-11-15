export default function FormImage({formImage}) {
  return (
    <div className="form-image">
      <img className="form-image__image" src={formImage} alt="pokemon-img"/>
    </div>
  );
}
