import React from 'react';
import QrCode from 'react-qr-code';

export class PrintPreview extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          padding: '16px',

          fontFamily: 'sans-serif'
        }}
      >
        {this.props.code !== '' ? (
          <div
            style={{
              border: 'solid',
              width: '300px',
              height: '375px',
              padding: '16px'
            }}
          >
            <QrCode value={this.props.code} />
            <div
              style={{
                marginTop: '16px',
                textAlign: 'center',

                borderTop: 'solid',
                borderTopWidth: 'thin',
                borderTopStyle: 'dashed'
              }}
            >
              <div
                style={{
                  marginTop: '16px'
                }}
              >
                <span
                  style={{
                    marginTop: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Bus Code:{' '}
                </span>
                <span
                  style={{
                    marginTop: '16px'
                  }}
                >
                  {this.props.code}
                </span>
              </div>
              <div
                style={{
                  marginTop: '8px'
                }}
              >
                <span
                  style={{
                    marginTop: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Bus Name:{' '}
                </span>
                <span
                  style={{
                    marginTop: '16px'
                  }}
                >
                  {this.props.name}
                </span>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
