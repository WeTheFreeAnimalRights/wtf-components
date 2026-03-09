import { omit } from 'lodash-es';

const KEYS_TO_OMIT = ['optional', 'includeInRequest', 'minimum'];

export const getParsedStandardProps = (props) => omit(props, KEYS_TO_OMIT);
