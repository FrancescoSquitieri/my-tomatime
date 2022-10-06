import { Row } from "react-bootstrap";
import done from '../../img/done.svg';


function KanbanPointers() {
    return <div className='container-fluid w-100 wrapper-icon'>
      <Row className='justify-content-end me-5 text-primary w-100'>
        <span>
          <div className='d-flex justify-content-between w-100'>
            <img src={done} alt='' style={{ height: '25px', width: '30px' }} className='me-2' />
            <p>0</p>
          </div>
        </span>
        <span>
          <div className='d-flex justify-content-around w-100'>
            <img src={done} alt='' style={{ height: '25px', width: '30px' }} className='me-2' />
            <p>0</p>
          </div>
        </span>
        <span>
          <div className='d-flex justify-content-around w-100'>
            <img src={done} alt='' style={{ height: '25px', width: '30px' }} className='me-2' />
            <p>0</p>
          </div>
        </span>
      </Row>
    </div>;
  }

export default KanbanPointers;