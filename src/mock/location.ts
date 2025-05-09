import type { MockMethod } from 'vite-plugin-mock';
import { v4 as uuidv4 } from 'uuid';
import type { Location } from '../types/Location';

let locations :Location[]= [
  {
    id: uuidv4(),
    code: 'LOC001',
    name: 'New York Office',
    description: 'Main office in NY',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default [
  {
    url: '/api/locations',
    method: 'get',
    response: () => ({
      status: 200,
      body: locations,
    }),
  },
  {
    url: '/api/locations',
    method: 'post',
    response: ({ body }:{body:Location}) => {
      const newLocation = {
        ...body,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      locations.push(newLocation);
      return { status: 201, body: newLocation };
    },
  },
  {
    url: '/api/locations/:id',
    method: 'put',
    response: ({ body, query }:{body:Location,query:Location}) => {
      const index = locations.findIndex(loc => loc.id === query.id);
      if (index !== -1) {
        locations[index] = {
          ...locations[index],
          ...body,
          updatedAt: new Date().toISOString(),
        };
      }
      return { status: 200, body: locations[index] };
    },
  },
  {
    url: '/api/locations/:id',
    method: 'delete',
    response: ({ query }:{query:Location}) => {
      locations = locations.filter(loc => loc.id !== query.id);
      return { status: 204 };
    },
    
  },
  {
    url: '/api/locations/:id',
    method: 'get',
    response: ({ query }:{query:Location})  => {
      console.log("query",query)
      const location = locations.find((loc) => loc.id === query?.id);
      if (!location) {
        return { status: 404, message: 'Not found' };
      }
      return {
        status: 200,
        body: location,
      }
    },
  }
] as MockMethod[];
