function MenuItem({ icon, img, title, subtitle }) {
  return (
    <li className="hover1">
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <div className="post_menu_text">
        <span>{title}</span>
        {subtitle && <span className="memu_post_col">{subtitle}</span>}
      </div>
    </li>
  );
}

export default MenuItem;
