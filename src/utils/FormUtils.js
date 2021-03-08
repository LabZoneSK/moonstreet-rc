/**
 * Handles input changes in forms. Updates inner state of component.
 *
 * @param {Object} event change event
 * @param {React.Component} self Component in which form is used
 */
// eslint-disable-next-line import/prefer-default-export
export function handleInputChangesGeneric(event, self) {
  const { target } = event;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const { name } = target;

  self.setState({
    [name]: value,
  });
}
