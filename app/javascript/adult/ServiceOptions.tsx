import React from 'react';

export default ({ services }) => {
  let options = [];

  for (let group in services) {
    options.push(
      <optgroup label={`${group}s`} key={group}>
        {services[group].map(service =>
          <option key={service.id} value={service.id}>{service.name}</option>
        )}
      </optgroup>
    )
  }

  return (
    <>
      {options}
    </>
  )
}
