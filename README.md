CKAN module written in Typescript

## Build
`npm run build`
Files are compiled and placed in ./dist

## Install via NPM
`npm install get+https://github.com/diaopk/ark-ckan-ts.git`

## CKAN API key config
Create a `ckan.config.json` in the root directory with the following content:
```
{
	"ckan_url": "<ckan-url>",
	"ckan_api_url": "<ckan-url>/api/action",
	"api_key": "<api-token-generated-by-ckan>",
	"api_key_id": "<id-of-api-key-above>"
}
```

## Use
```
import {...} from 'ark-ckan-ts';
```