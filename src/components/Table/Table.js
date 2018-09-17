import React      from 'react'
import PropTypes  from 'prop-types'
import Radium     from 'radium'

const styles = {
  table: {
    borderCollapse: 'collapse',
    borderRadius: '4px',
    borderSpacing: 0,
    boxShadow: '0 1px 2px #aaa',
    overflow: 'hidden',
    width: '100%',
  },

  cell: {
    background: '#fff',
    fontSize: '14px',
    fontWeight: 400,
    height: '48px',
    lineHeight: '48px',
    padding: '0 16px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },

  cellAlt: {
    background: '#f7f7f7'
  }

  cellClickable: {
    background: '#feffe8',
    cursor: 'pointer'
  }
}

const Table = props => {
  const { withHeader = true, definition, onRowClick, data } = this.props
  const haveRowClick = !!onRowClick

  return (
    <table style={styles.table}>
      {!withHeader ? null : (
        <thead>
          <tr>
            {definition.map((def, index) => (
              <th key={index} style={styles.cell}>
                {def.header !== undefined ? def.header : def.attribute}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            onClick={!onRowClick ? null : () => {
              onRowClick(row)
            }}
          >
            {definition.map((def, cellIndex) => {
              const cellStyles = [styles.cell]
              if (index % 2 === 0) {
                cellStyles.push(styles.cellAlt)
              }
              if (haveRowClick) {
                cellStyles.push(styles.cellClickable)
              }
              
              return (
                <td key={cellIndex} style={Object.assign.apply(null, [{}, ...cellStyles])}>
                  {def.cellRender ? def.cellRender(row[def.attribute], index, row) : row[def.attribute]}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>

      <style jsx>{styles}</style>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes
    .arrayOf(PropTypes.object)
    .isRequired,

  definition: (props, propName) => {
    const definition = props[propName]

    if (!Array.isArray(definition)) {
      return new Error('Table required definition prop must be an Array')
    }

    for (const cell of definition) {
      if (cell.attribute === undefined) {
        return new Error('All Table definition object must have an .attribute')
      }
    }
  },

  withHeader: PropTypes.bool,
}

export default Radium(Table)