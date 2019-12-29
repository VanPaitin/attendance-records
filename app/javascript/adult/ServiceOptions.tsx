import React from 'react';

export default ({ services }) => {
  let groups = Object.keys(services);
  return (
    <>
      {groups.map(group =>
        <optgroup label={`${group}s`} key={group}>
          {services[group].map(service =>
            <option key={service.id} value={service.id}>{service.name}</option>
          )}
        </optgroup>
      )}
    </>
  )
}
