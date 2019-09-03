import React from 'react';
import PropTypes from 'prop-types';

export default class SkillRow extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    const { label, value } = this.props;
    const formatLabel = label.toLowerCase();
    this.props.chooseSkill({ skill: formatLabel, value });
  }

  render() {
    const { className, label, value, isButton, style, disabled } = this.props;
    return (
      <div className={`grid-x ${className}`} style={style}>
        {isButton && <button onClick={this.onSelect} disabled={disabled} />}
        <div className="cell small-10">{label}</div>
        <div className="cell small-2">{value}</div>
      </div>
    );
  }
}

SkillRow.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  isButton: PropTypes.bool
};
