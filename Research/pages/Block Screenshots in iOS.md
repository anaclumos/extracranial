---
lang: 'en'
slug: '/8AFCA7'
---

![[E13EA3.gif]]

Use SecureField

```swift

import UIKit

class ViewController: UIViewController {
    private lazy var screenshotBlockLabel: UILabel = {
        let label = UILabel()
        label.text = "No Screenshots ❌"
        label.textAlignment = .center
        return label
    }()

    private lazy var tableView: UITableView = {
        let tableView = UITableView()
        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        return tableView
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        setupSecureView()
    }

    private func setupSecureView() {
        guard let secureView = SecureField().secureContainer else { return }

        view.addSubview(screenshotBlockLabel)
        screenshotBlockLabel.pinEdges()

        secureView.addSubview(tableView)
        tableView.pinEdges()

        view.addSubview(secureView)
        secureView.pinEdges()
    }
}

extension ViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        5
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = "Try to screenshot \(indexPath)"
        return cell
    }
}

class SecureField: UITextField {
    weak var secureContainer: UIView? {
        let secureView = subviews.first { String(describing: type(of: $0)).contains("CanvasView") }
        secureView?.translatesAutoresizingMaskIntoConstraints = false
        secureView?.isUserInteractionEnabled = true
        return secureView
    }

    override var canBecomeFirstResponder: Bool { false }
    override func becomeFirstResponder() -> Bool { false }

    override init(frame: CGRect) {
        super.init(frame: .zero)
        isSecureTextEntry = true
        translatesAutoresizingMaskIntoConstraints = false
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

extension UIView {
    func pinEdges(to superview: UIView? = nil) {
        guard let superview = superview ?? self.superview else { return }
        translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            topAnchor.constraint(equalTo: superview.topAnchor),
            leadingAnchor.constraint(equalTo: superview.leadingAnchor),
            trailingAnchor.constraint(equalTo: superview.trailingAnchor),
            bottomAnchor.constraint(equalTo: superview.bottomAnchor)
        ])
    }
}
```

## References

- [ScreenShot Prevention in iOS. Screenshots are a convenient feature… | by Lakshmi Chidambaranathan](https://medium.com/@lakshimi.cg/screenshot-prevention-in-ios-f059dc82b046)
