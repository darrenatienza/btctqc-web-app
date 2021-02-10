import { makeEntity } from 'react-entities';
import * as currentUser from './currentUser';
import * as passenger from './passenger';
import * as bus from './bus';
export const usePassenger = makeEntity(passenger);
export const useCurrentUser = makeEntity(currentUser);
export const useBus = makeEntity(bus);
