function Message(text, size) {
    this.color = Graphics.getRainbow();
    this.text = text;
    this.size = size;
    this.visible = true;

    let created = Date.now();
    this.update = function(data) {
        if(data.time.now - created > 1000)
            this.visible = false;
    }
}
