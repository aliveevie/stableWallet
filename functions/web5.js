import { Web5 } from '@tbd54566975/web5';

export async function createDID() {
  const { did: myDID, web5 } = await Web5.create();
  console.log('Your new DID:', myDID);
  return { myDID, web5 };
}

