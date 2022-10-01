function Photos({ photos }) {
  return (
    <div
      className="profile_card"
      style={{
        position: 'sticky',
        top: '-62px',
      }}
    >
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">Xem tất cả hình ảnh</div>
      </div>

      <div className="profile_header_count">
        {photos.total_count === 0
          ? 'No photos'
          : photos.total_count === 1
          ? '1 Photo'
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((photo) => (
            <div className="profile_photo_card" key={photo.public_id}>
              <img src={photo.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Photos;
