import ui
def get_view():
    v = ui.View(bg_color='white')
    lbl = ui.Label(text='TRAXOVO Fleet Dashboard', frame=(10,10,280,40))
    v.add_subview(lbl)
    return v