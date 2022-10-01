import { Dots } from '../../svg';
import { stories } from '../../data/home';
import AddFriendSmallCard from './AddFriendSmallCard';

function PpYouMayKnow() {
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People you may know
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {stories.map((item, index) => (
          <AddFriendSmallCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default PpYouMayKnow;
