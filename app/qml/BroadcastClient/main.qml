import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3
import QtWebSockets 1.1
import '../../../dev/qml/broadcast.qml.js' as Broadcast
//import '../../../dist/qml/broadcast.qml.js' as Broadcast

ApplicationWindow {
    visible: true
    width: 460
    height: 500
    title: qsTr('Broadcast Client')

    property var broadcastClient

    function updateStatus(ready) {
        status.text = ready ? qsTr('Connected') : qsTr('Not Connected');
        sendButton.enabled = ready;
    }

    function appendText(text) {
        textArea.append(text)
    }

    GridLayout {
        columns: 2

        Label {
            id: status
            Layout.columnSpan: 2
        }

        TextField {
            id: textField
            implicitWidth: 300
            placeholderText: qsTr('Type Some Text Here')
        }

        Button {
            id: sendButton
            text: qsTr('Send')
            onClicked: broadcastClient.send(textField.text)
        }

        TextArea {
            Layout.columnSpan: 2
            id: textArea
            background: Rectangle {
                implicitWidth: 300
                implicitHeight: 390
                border.color: 'lightgray'
            }
            readOnly: true
        }

        Button {
            id: clearButton
            text: qsTr('Clear')
            onClicked: textArea.clear()
        }
    }

    Component.onCompleted: {
        updateStatus(false)
        broadcastClient = new Broadcast.Client('ws://localhost:8080')
        broadcastClient.readyChanged.connect(updateStatus)
        broadcastClient.messageReceived.connect(appendText)
    }
}
