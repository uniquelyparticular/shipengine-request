# @particular./shipengine-request

[![npm version](https://img.shields.io/npm/v/@particular./shipengine-request.svg)](https://www.npmjs.com/package/@particular./shipengine-request) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![CircleCI](https://img.shields.io/circleci/project/github/uniquelyparticular/shipengine-request.svg?label=circleci)](https://circleci.com/gh/uniquelyparticular/shipengine-request)
![dependency status: david](https://img.shields.io/david/uniquelyparticular/shipengine-request.svg)

> 🎮 Minimal [ShipEngine](https://www.shipengine.com) API request library for Node

## Installation

```bash
yarn add @particular./shipengine-request # npm install @particular./shipengine-request
```

## Quickstart (implicit)

```js
const { createClient } = require('@particular./shipengine-request');
// import { createClient } from '@particular./shipengine-request'

const shipEngine = new createClient({
  client_secret: '...'
});

shipEngine
  .delete('tags/:tag_name')
  .then(console.log)
  .catch(console.error);

shipEngine
  .get('carriers')
  .then(console.log)
  .catch(console.error);

shipEngine
  .patch('insurance/shipsurance/add_funds', {
    currency: 'usd',
    amount: 10.0
  })
  .then(console.log)
  .catch(console.error);

shipEngine
  .post('rates', {
    shipment_id: 'se-123',
    rate_options: {
      carrier_ids: ['se-123890']
    }
  })
  .then(console.log)
  .catch(console.error);

shipEngine
  .put('shipments/:shipment_id', {
    validate_address: 'no_validation',
    shipment_id: 'se-202902255',
    carrier_id: 'se-123890',
    service_code: 'usps_priority_mail',
    external_shipment_id: '6801bdc2-ed1d-472f-8108-fcc3c163a172',
    ship_date: '2019-04-11T05:00:00.000Z',
    created_at: '2019-04-11T19:09:29.151Z',
    modified_at: '2019-04-11T19:09:29.151Z',
    shipment_status: 'pending',
    ship_to: {
      name: 'Mickey and Minnie Mouse',
      phone: '714-781-4565',
      company_name: 'The Walt Disney Company',
      address_line1: '500 S BUENA VISTA ST',
      address_line2: '',
      city_locality: 'BURBANK',
      state_province: 'CA',
      postal_code: '91521-0001',
      country_code: 'US'
    },
    // ...
    insurance_provider: 'none',
    tags: [],
    packages: [
      {
        weight: {
          value: 9.6,
          unit: 'ounce'
        },
        dimensions: {
          unit: 'inch',
          length: 12.0,
          width: 7.1,
          height: 6.0
        },
        insured_value: {
          currency: 'usd',
          amount: 0.0
        }
      }
    ]
  })
  .then(console.log)
  .catch(console.error);
```

## Kitchen sink

```js
const { createClient } = require('@particular./shipengine-request');

const shipEngine = new createClient({
  client_secret: '...',
  host: '...',
  version: '...',
  application: '...',
  currency: '...',
  headers: {
    // ...
  }
});
```

## Custom headers per request

The API provides you the ability to send various request headers that change the way data is stored or retrieved.

By default this library will encode all data as JSON, however you can customise this by setting your own `Content-Type` header as an additional argument to `get`, `patch`, `post`, `put` and `delete`.

**Note**: If you add the `Content-Type` custom header to `patch`, `post`, `put` or `delete` you will need to encode `data` yourself.

```js
const { createClient } = require('@particular./shipengine-request');

const shipEngine = new createClient({
  client_secret: '...'
});

const headers = {
  'X-ShipEngine-Currency': 'gbp'
};

shipEngine
  .get('carriers', headers)
  .then(console.log)
  .catch(console.error);
```

_Contact [Adam Grohs](https://www.linkedin.com/in/adamgrohs/) @ [Particular.](https://uniquelyparticular.com) for any questions._
