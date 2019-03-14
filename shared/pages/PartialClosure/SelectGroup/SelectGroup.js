import React, { Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import CSSModules from 'react-css-modules'
import styles from './SelectGroup.scss'

import Input from 'components/forms/Input/Input'
import FieldLabel from 'components/forms/FieldLabel/FieldLabel'
import CurrencySelect from 'components/ui/CurrencySelect/CurrencySelect'
import Tooltip from 'components/ui/Tooltip/Tooltip'
import { BigNumber } from 'bignumber.js'

import { inputReplaceCommaWithDot } from 'helpers/domUtils'

// TODO to split data and view this component

const SelectGroup = ({
  dynamicFee,
  isToken,
  extendedControls,
  selectedValue,
  onSelect,
  currencies,
  usd,
  placeholder,
  label,
  disabled,
  className,
  inputValueLink,
  tooltip,
  balance,
  id,
  idFee,
  tooltipAboutFee,
  ...props
}) => (
  <div>
    <FieldLabel inRow>
      <strong>
        {label}
      </strong>
      &nbsp;
      <Tooltip id={id}>
        {tooltip}
      </Tooltip>
    </FieldLabel>
    <div styleName="groupField" className={className}>
      <Input
        styleName="inputRoot"
        inputContainerClassName="inputContainer"
        valueLink={inputValueLink}
        type="number"
        placeholder={placeholder}
        pattern="0-9\."
        disabled={disabled}
        onFocus={props.onFocus ? props.onFocus : () => {}}
        onBlur={props.onBlur ? props.onBlur : () => {}}
        onKeyDown={inputReplaceCommaWithDot}
      />
      {
        (selectedValue === 'eth' || selectedValue === 'btc') && usd > 0 &&
        <p styleName="textUsd" >{`~${usd}`}$</p>
      }
      <CurrencySelect
        styleName="currencySelect"
        selectedValue={selectedValue}
        onSelect={onSelect}
        currencies={currencies}
      />
    </div>
    {label.props.defaultMessage === 'You sell' && !extendedControls &&
      (balance > 0 ?
        !isToken &&
          <span
            styleName="balance">
            {<FormattedMessage
              id="select75"
              defaultMessage="Available for exchange: {availableBalance} {tooltip}"
              values={{
                availableBalance: `${BigNumber(balance).minus(dynamicFee).dp(6, BigNumber.ROUND_HALF_CEIL)} ${selectedValue.toUpperCase()}`,
                tooltip: <Tooltip id={idFee}> {tooltipAboutFee}</Tooltip>,
              }} />
            }
          </span> :
        <span styleName="textForNull">
          <FormattedMessage id="selected53" defaultMessage="You can use an external wallet to perform a swap, directly during the exchange" />
        </span>
      )
    }
  </div>
)


export default injectIntl(CSSModules(SelectGroup, styles, { allowMultiple: true }))
